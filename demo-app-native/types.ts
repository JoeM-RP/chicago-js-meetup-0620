export interface User {
    name: Name;
    location: Location;
    email: string;
    phone: string;
    picture: Picture;
    login: Login;
  }
  
  export interface Login {
    username: string;
  }
  
  export interface Name {
    first: string;
    last: string;
  }
  
  export interface Location {
    street: Street;
    city: string;
    state: string;
    postcode: string;
    country: string;
  }
  
  export interface Street {
    number: string;
    name: string;
  }
  
  export interface Picture {
    large: string
  }