import { useState } from "react";

function Fact({
   id,
   text,
   category,
   votesInteresting,
   votesMindblowing,
   votesFalse,
   setFacts,
   categories
}) {
   const [isUpdating, setIsUpdating] = useState(false);
   const isDisputed = votesFalse > votesInteresting + votesMindblowing;

   async function handleVoteInteresting() {
      setIsUpdating(true);
      const { data: updatedFact, error } = await supabase
         .from("facts")
         .update({
            votesInteresting: votesInteresting + 1,
         })
         .eq("id", id)
         .select();
      setIsUpdating(false);

      if (!error)
         setFacts((fact) =>
            fact.map((item) => (item.id === id ? updatedFact[0] : item))
         );
   }

   async function handleVoteMindblowing() {
      setIsUpdating(true);
      const { data: updatedFact, error } = await supabase
         .from("facts")
         .update({
            votesMindblowing: votesMindblowing + 1,
         })
         .eq("id", id)
         .select();
      setIsUpdating(false);

      if (!error)
         setFacts((fact) =>
            fact.map((item) => (item.id === id ? updatedFact[0] : item))
         );
   }

   async function handleVoteFalse() {
      setIsUpdating(true);
      const { data: updatedFact, error } = await supabase
         .from("facts")
         .update({
            votesFalse: votesFalse + 1,
         })
         .eq("id", id)
         .select();
      setIsUpdating(false);

      if (!error)
         setFacts((fact) =>
            fact.map((item) => (item.id === id ? updatedFact[0] : item))
         );
   }

   return (
      <li className='list__fact-list'>
         <p>
            {isDisputed ? (
               <span className='disputed'>[⛔️ DISPUTED]</span>
            ) : null}
            {text}
            <a
               className='list__fact-source'
               href='https://opensource.fb.com/'
               target='_blank'>
               (Source)
            </a>
         </p>
         <span
            className='list__fact-tag'
            style={{
               backgroundColor: categories.find(
                  (item) => item.name === category
               ).color,
            }}>
            {category}
         </span>
         <div className='list__vote-button'>
            <button onClick={handleVoteInteresting} disabled={isUpdating}>
               👍 {votesInteresting}
            </button>
            <button onClick={handleVoteMindblowing} disabled={isUpdating}>
               🤯 {votesMindblowing}
            </button>
            <button onClick={handleVoteFalse} disabled={isUpdating}>
               ⛔️ {votesFalse}
            </button>
         </div>
      </li>
   );
}

export default Fact;
