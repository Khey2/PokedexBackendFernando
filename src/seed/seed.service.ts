import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interface/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';



@Injectable()
export class SeedService {

  
 

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon> ,//importando el model (entity),
    private readonly http: AxiosAdapter
  ){  }


  async executeSeed(){

    await this.pokemonModel.deleteMany({}); // delete * from pokemons

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');


    const PokemonToInsert: { name: string, no: number}[] = [];

    data.results.forEach( async({ name, url }) => {

      const segments = url.split("/");
      const no = +segments[segments.length - 2]
      
      PokemonToInsert.push({name, no}) //[{name: bulkbasor, no: 65}]
    })

    //insert many = insert into Pokemons( name, no)
    // (name: bulbador) 
    // (name: pikachu) 
    // .... hasta 650 (HACE 650 INSERCIONES)
    await this.pokemonModel.insertMany(PokemonToInsert) 
  }
}
