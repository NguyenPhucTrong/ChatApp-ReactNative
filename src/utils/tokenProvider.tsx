import { supabase } from "../lib/ supabase"


export const tokenProvider = async () => {
    const { data } = await supabase.functions.invoke("stream-token");
    console.log(data); // Log the token to the console for debugging.
    return data.token;
}