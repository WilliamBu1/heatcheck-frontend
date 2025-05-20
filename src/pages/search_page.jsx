import React, { useState } from 'react';
import PlayerSearchAutocomplete from '../components/PlayerSearchAutocomplete';
import { getPlayerStats } from '../api_calls/stats';

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
    // You could fetch additional player data here
    console.log(`Selected player: ${player}`);
  };

  const handleSearchSubmit = async (searchText) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log(`Searching for: ${searchText}`);
      const playerStats = await getPlayerStats(searchText);
      console.log('Player stats:', playerStats);
      setPlayerData(playerStats);
    } catch (error) {
      console.error('Error fetching player stats:', error);
      setError('Failed to fetch player data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-start pt-12">
      <div className="w-full max-w-xl mx-auto text-center p-6">
        <h1 className="text-3xl font-bold font-michroma mb-8">Player Search</h1>
        
        {/* Player search with autocomplete */}
        <div className="mb-4">
          <PlayerSearchAutocomplete 
            players={players} 
            onPlayerSelect={handlePlayerSelect}
            onSearchSubmit={handleSearchSubmit}
          />
          <p className="mt-3 text-gray-400 text-sm">
            Start typing to search for an NBA player
          </p>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="mt-8 flex justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-red-500 rounded-full border-t-transparent"></div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mt-8 p-4 bg-red-900/50 border border-red-700 rounded-lg text-white">
            {error}
          </div>
        )}

        {/* Display raw JSON data */}
        {playerData && !isLoading && (
          <div className="mt-8 text-left">
            <h2 className="text-xl font-bold mb-4">API Response:</h2>
            <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                {JSON.stringify(playerData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search_player;