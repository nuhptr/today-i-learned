import Fact from "./Facts";

function FactList({ facts, setFacts, categories }) {
   if (facts.length === 0) {
      return (
         <p className='message'>No Facts for this category yet! create ones!</p>
      );
   }
   return (
      <section>
         <ul key={facts} className='list'>
            {facts.map((fact) => (
               <Fact
                  key={fact.id}
                  id={fact.id}
                  text={fact.text}
                  category={fact.category}
                  votesInteresting={fact.votesInteresting}
                  votesMindblowing={fact.votesMindblowing}
                  votesFalse={fact.votesFalse}
                  setFacts={setFacts}
                  categories={categories}
               />
            ))}
         </ul>
      </section>
   );
}

export default FactList;
