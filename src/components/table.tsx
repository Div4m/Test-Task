import React from "react";
 
type Country = {
    name: string;
    capital: string;
    currencies: string;
    languages: string;
    area: number;
    population: number;
};
 
type State = {
    data: Country[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    itemsPerPage: number;
};
 
function normalizeCountry(c: any): Country {
    return {
        name: c.name?.common || "N/A",
        capital: c.capital?.[0] || "N/A",
        currencies: c.currencies
            ? Object.values(c.currencies)
                  .map((cur: any) => cur.name)
                  .join(", ")
            : "N/A",
        languages: c.languages ? Object.values(c.languages).join(", ") : "N/A",
        area: c.area || 0,
        population: c.population || 0,
    };
}
 
class TableData extends React.Component<{}, State> {
    state: State;
 
    constructor(props: {}) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            error: null,
            currentPage: 1,
            itemsPerPage: 10,
        };
    }
 
    componentDidMount() {
        this.fetchData();
    }
 
    componentDidUpdate({}, prevState: State) {
        if (prevState.currentPage !== this.state.currentPage) {
            this.setState({ loading: true });
            setTimeout(() => {
                this.setState({ loading: false });
            }, 800);
        }
    }
 
    fetchData = async () => {
        try {
            const res = await fetch(
                "https://restcountries.com/v3.1/independent?status=true&fields=name,area,capital,currencies,languages,population"
            );
            const parsedRes = await res.json();
            const countryData: Country[] = parsedRes.map(normalizeCountry);
            this.setState({ data: countryData, loading: false });
        } catch (err: any) {
            this.setState({ loading: false, error: String(err) });
        }
    };
 
    render() {
        const { data, loading, error, currentPage, itemsPerPage } = this.state;
 
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentData = data.slice(startIndex, startIndex + itemsPerPage);
 
        return (
            <>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        Error: {error}
                    </div>
                )}
 
                {loading && (
                    <div className="alert alert-info" role="alert">
                        Loading data please wait!
                    </div>
                )}
 
                {!loading && !error && (
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope="col">name</th>
                                <th scope="col">capital</th>
                                <th scope="col">currencies</th>
                                <th scope="col">languages</th>
                                <th scope="col">area</th>
                                <th scope="col">population</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((country: Country, index: number) => (
                                <tr key={index}>
                                    <td>{country.name}</td>
                                    <td>{country.capital}</td>
                                    <td>{country.currencies}</td>
                                    <td>{country.languages}</td>
                                    <td>{country.area}</td>
                                    <td>{country.population}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
 
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() =>
                            this.setState({ currentPage: currentPage - 1 })
                        }
                    >
                        Prev
                    </button>
                    <span> Page {currentPage} </span>
                    <button
                        disabled={startIndex + itemsPerPage >= data.length}
                        onClick={() =>
                            this.setState({ currentPage: currentPage + 1 })
                        }
                    >
                        Next
                    </button>
                </div>
            </>
        );
    }
}
 
export default TableData;