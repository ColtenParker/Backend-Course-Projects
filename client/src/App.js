import './App.css';
import { useEffect, useState } from 'react';

const App = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/favorites');
                const data = await response.json();
                setData(data);
            } catch (err) {
                setError('Error fetching data: ' + err.message);
            }
        };

        fetchData();

        console.log('use Effect');
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {data.favorites.map((fav) => {
                console.log(fav);
                return (
                    <div key={fav.id}>
                        <a href={fav.url}>{fav.name}</a>
                    </div>
                );
            })}
        </div>
    );
};

export default App;
