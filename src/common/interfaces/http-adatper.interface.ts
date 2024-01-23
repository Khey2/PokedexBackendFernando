
export interface HttpAdapter {
    //si le mandas un numbr, resolver una number, se sustitueyen las T
    get<T>( url: string) : Promise<T>;
}
