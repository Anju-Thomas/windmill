
export interface inspection{
    blade_id:string;
    inspection_date:string;
    blade_serial_num:string;
    blade_cat:Category;
    notes:Note[];
    images:Images[];

}
export interface Note {
    text: string;
    date: number;
  }
  export interface Category {
    auto: number;
    validated: number;
  }
  export interface Images{
      image_cat:Category;
      image_hash:string;
      notes:Note[];
      URI:string;
  }
  