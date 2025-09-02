import {useEffect,useState} from "react"

type Product = {
  id : number;
  title : string;
  price: number;
  category:string;
  image:string;
}


function FetchApi(){
    const[product,setProducts] = useState<Product[]>([]);
    const[loading,setLoading] = useState<boolean>(true);
    const[error,setError] = useState<string>("");

    
    useEffect(()=>{
      let isMounted = true;

    const fetching= async ()=>{
        try{
            const response = await fetch("https://fakestoreapi.com/products");
            if(!response.ok) throw new Error("Failed to fetch")
            const data:Product[] = await response.json();
            if(isMounted)setProducts(data);
        }
        catch(err:any){
            if(isMounted)setError(err.message|| "Somthing went wrong");
        }
        finally{
            if(isMounted)setLoading(false);
        }

    }
    fetching();
    return ()=>{
      console.log("Unmounting the data");
      isMounted = false;
      setProducts([]);
    };
},[]);

if (loading) return <p>Loading...</p>;
if (error) return <p style={{ color: "red" }}>{error}</p>;
 return (
    <div>
      <h2>Users List (Async/Await)</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {product.map((product) => (
          <div key={product.id} style={{ border: "1px solid gray", padding: "10px", borderRadius: "8px" }}>
            <img src={product.image} alt={product.title} width="100" height="100" />
            <h3>{product.title}</h3>
            <p><b>Price:</b> ${product.price}</p>
            <p><b>Category:</b> {product.category}</p>
          </div>
        ))}
      </div>
      </div>
  );

};

export default FetchApi 