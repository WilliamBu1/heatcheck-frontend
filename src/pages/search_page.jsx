import React, { useState } from 'react';
import PlayerSearchAutocomplete from '../components/PlayerSearchAutocomplete';
import { getPlayerStats } from '../api_calls/stats';
import PlayerStatsDisplayCard from '../components/PlayerStatsDisplayCard';

const Search_player = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const players = [
    "Alex Sarr",
    "Alperen Sengun",
    "Amen Thompson",
    "Andrew Wiggins",
    "Anfernee Simons",
    "Anthony Davis",
    "Anthony Edwards",
    "Austin Reaves",
    "Bam Adebayo",
    "Bennedict Mathurin",
    "Bradley Beal",
    "Brandon Ingram",
    "Brandon Miller",
    "CJ McCollum",
    "Cade Cunningham",
    "Cam Thomas",
    "Cameron Johnson",
    "Chet Holmgren",
    "Coby White",
    "Collin Sexton",
    "D'Angelo Russell",
    "Damian Lillard",
    "Darius Garland",
    "De'Aaron Fox",
    "DeMar DeRozan",
    "Deni Avdija",
    "Desmond Bane",
    "Devin Booker",
    "Devin Vassell",
    "Domantas Sabonis",
    "Donovan Mitchell",
    "Dyson Daniels",
    "Evan Mobley",
    "Franz Wagner",
    "Giannis Antetokounmpo",
    "Ja Morant",
    "Jaden Ivey",
    "Jalen Brunson",
    "Jalen Green",
    "Jalen Johnson",
    "Jalen Suggs",
    "Jalen Williams",
    "Jamal Murray",
    "James Harden",
    "Jaren Jackson Jr.",
    "Jaylen Brown",
    "Jayson Tatum",
    "Jimmy Butler III",
    "Joel Embiid",
    "John Collins",
    "Jonathan Kuminga",
    "Jordan Poole",
    "Josh Giddey",
    "Julius Randle",
    "Karl-Anthony Towns",
    "Kawhi Leonard",
    "Kevin Durant",
    "Kristaps Porziņģis",
    "Kyle Kuzma",
    "Kyrie Irving",
    "LaMelo Ball",
    "Lauri Markkanen",
    "LeBron James",
    "Luka Dončić",
    "Malcolm Brogdon",
    "Malik Beasley",
    "Michael Porter Jr.",
    "Miles Bridges",
    "Naz Reid",
    "Nikola Jokić",
    "Nikola Vučević",
    "Norman Powell",
    "OG Anunoby",
    "P.J. Washington",
    "Paolo Banchero",
    "Pascal Siakam",
    "Paul George",
    "RJ Barrett",
    "Scottie Barnes",
    "Shaedon Sharpe",
    "Shai Gilgeous-Alexander",
    "Stephen Curry",
    "Trae Young",
    "Trey Murphy III",
    "Tyler Herro",
    "Tyrese Haliburton",
    "Tyrese Maxey",
    "Victor Wembanyama",
    "Zach LaVine",
    "Zion Williamson"
  ];

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
    setPlayerData(null);
    setError(null);
    console.log(`Selected player: ${player}`);
  };

  const handleSearchSubmit = async (searchText) => {
    if (!searchText || searchText.trim() === '') {
      setError('Please enter a player name to search.');
      setPlayerData(null);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      setPlayerData(null);
      console.log(`Searching for: ${searchText}`);
      const apiResponse = await getPlayerStats(searchText);
      console.log('API Response:', apiResponse);

      if (apiResponse && typeof apiResponse === 'object' && !apiResponse.error) {
        setPlayerData(apiResponse);
      } else if (apiResponse && apiResponse.error) {
        setError(`Error for ${searchText}: ${apiResponse.error}`);
        setPlayerData(null);
      } else {
        setError(`No stats found for ${searchText} or unexpected data format.`);
        setPlayerData(null);
      }

    } catch (error) {
      console.error('Error fetching player stats:', error);
      setError('Failed to fetch player data. Check the console for details.');
      setPlayerData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const searchSectionWrapperClass = "w-full max-w-xl mx-auto text-center mb-6";
  const mainContentWrapperClass = playerData 
    ? "w-full px-2 sm:px-4" // Full width with slight padding when card is shown
    : "w-full max-w-2xl mx-auto text-center p-4 md:p-6"; // Centered and max-width when card is not shown

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-start pt-12">
      <div className={searchSectionWrapperClass}>
        <h1 className="text-3xl font-bold font-michroma mb-8">Player Search</h1>
        <div className="mb-4">
          <PlayerSearchAutocomplete 
            players={players} 
            onPlayerSelect={handlePlayerSelect}
            onSearchSubmit={handleSearchSubmit}
          />
          <p className="mt-3 text-gray-400 text-sm">
            Start typing to search for an NBA player.
          </p>
        </div>
      </div>

      <div className={mainContentWrapperClass}>
        {isLoading && (
          <div className="mt-8 flex justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-red-500 rounded-full border-t-transparent"></div>
          </div>
        )}

        {error && !isLoading && (
          <div className="mt-8 p-4 bg-red-900/60 border border-red-700 rounded-lg text-white text-center max-w-md mx-auto">
            <p className="font-semibold">Search Error:</p>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && playerData && (
          <PlayerStatsDisplayCard playerData={playerData} playerName={selectedPlayer} />
        )}
        
        {!isLoading && !error && !playerData && selectedPlayer && (
           <p className="mt-8 text-gray-500">Click "Go" or press Enter to fetch stats for {selectedPlayer}.</p>
        )}
      </div>
    </div>
  );
};

export default Search_player;