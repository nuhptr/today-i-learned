// Header component
function Header({ showForm, handleOpenForm }) {
   const appTitle = "Today I Learned";

   return (
      <header className='header'>
         <div className='header__fact-logo'>
            <img src='/logo.png' alt='Logo today i learned' />
            <h1>{appTitle}</h1>
         </div>
         <button className='btn btn-large btn-open' onClick={handleOpenForm}>
            {showForm ? "Close" : "Share a fact"}
         </button>
      </header>
   );
}

export default Header;
