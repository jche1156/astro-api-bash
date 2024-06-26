export const prerender = false;
import { createClient } from '@supabase/supabase-js';

export async function GET({params, request}) {
  const supabaseUrl = await (import.meta.env.SECRET_SUPABASE_URL);
  const supabaseKey = await (import.meta.env.SECRET_SUPABASE_KEY);
  const supabase = createClient(supabaseUrl, supabaseKey);
  console.log(params);
  
  const { data, errorFetch } = await supabase
    .from('article_stats')
    .select()
    .eq('article_slug', params.article_slug);

  const reactions = data[0];
  console.log(reactions);
  
  const new_count = reactions[params.reaction] + (params.reactionType == 'incr' ? 1 : (params.reactionType == 'decr' ? -1 : 0));
  let obj = {};
  obj[params.reaction] = new_count;

  console.log(obj);
  
  const { errorUpdate } = await supabase
    .from('article_stats')
    .update(obj)
    .eq('article_slug', params.article_slug);


  return new Response(JSON.stringify({
    "status": "OK",
    "article_slug": params.article_slug,
    "updated_field": params.reaction,
    "new_value": new_count,
  }));
}
