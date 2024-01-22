import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon> //importando el model (entity)
  ){}



  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try{
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
    }catch(error){
      this.HandleExceptions(error)
    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {

      let pokemon: Pokemon;
  
      if(!isNaN(+term)){
  
        pokemon= await this.pokemonModel.findOne({no: term});
  
      }else if ( isValidObjectId(term) ) {
  
        pokemon = await this.pokemonModel.findById( {_id:term} );
  
      }else {
  
        pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() })
        
      }
      if(!pokemon) throw new NotFoundException(`Pokemon whit id ${term} not found`)
  
      return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {


     //esto te gresa un modelo dodne puedes hacer updastes, las propiedades, etc! ( el model)
     const pokemon = await this.findOne( term )//encuentra algo en la base dodne se de la coincidencia 
     console.log({pokemon})
     //recuerda, userPokemonDto HEREDA las propiedades name y no de una clase padre llamada CreateDto, pero, al tener la palabra opartial type..
     //las hereda con la bandera de propiedades opcionales (pueden venir, o no)
     //por eso es que aqui te mandan un name sin no o te pueden mandar no sin name y se actualzia
     if (updatePokemonDto.name )
             updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

           //actualizas las propiedades del pokemonj (sobrescribes als anteriores con las mandadas)
           //en updatePokemonDto desde el frontend

      try{
       await pokemon.updateOne(updatePokemonDto);


       console.log({pokemon: pokemon.toJSON(),updatePokemonDto })
       //finalmente, para retornar visualmente el cambio, hacemos un spreed operator de las propiedades originales (el datop anterior)
       //y las sobrescribimos con las mandadas den UpdatePokemonDto, barriendo las propiedades
       //anteriores y quedadno el update tanto visual como eld e DB
       return { ...pokemon.toJSON(), ...updatePokemonDto};
    
   }catch(error){
    this.HandleExceptions(error)
   }  

  }

  async remove(id: string) {
    //1.- encontrar pokemon
    // const pokemon = await this.findOne( id )

    // //si pokemon se encuentra, se elimina, en caso e no encontraqrse tiraria un error 
    // //y esto nunca se ejecutaria
    // await pokemon.deleteOne(); 
    // const result = await this.pokemonModel.findByIdAndDelete( id )
    const { deletedCount, acknowledged } = await this.pokemonModel.deleteOne({_id: id}) 
    if( deletedCount === 0)
      throw new BadRequestException(`Pokemon with id "${id}" not found`)

    
    return;
    
  }




  //manejar errores
  private HandleExceptions( error:any){
    if( error.code === 11000){
      throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify(error.keyValue )}`);
    }
    console.log(error)
    throw new InternalServerErrorException("Cant update pokemon - Check server logs")
  } 
}
