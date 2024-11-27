import { create } from 'zustand'

export const locationstore = create((set) => ({
    location:{
        Latitude:"6.127194",
        Longitude:"81.122452"
    },
    updatelocation:(newlocation:any)=>set((state:any)=>({
        location:newlocation
    }))

}))