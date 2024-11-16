import styles from './CountryList.module.css';
import CountryItem from './CountryItem';
import Spinner from './Spinner';
import Message from './Message';

function CountriesList({ cities, isLoading }) {
    if (isLoading) return <Spinner />;

    if (!cities.length) return <Message message='Add your first city by cliking on a city on the map' />

    const countries = cities.reduce((arr, city) => {
        if (!arr.map((c) => c.country).includes(city.country)) {
            return [...arr, { country: city.country, emoji: city.emoji }];
        }
        else return arr;
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (<CountryItem country={country} key={country.country} />))}
        </ul>
    );
}

export default CountriesList;