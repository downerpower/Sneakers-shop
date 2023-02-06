import { useEffect, useState } from "react"

const useFetch = (url) => {
   const [data, setData] = useState(null)
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      setLoading(true);
      try {
         fetch(url)
            .then(res => res.ok && res.json())
            .then(data => {
               setData(data);
               setLoading(false);
            })
      } catch (err) {
         setError(err)
         console.log(err);
         setLoading(false);
      } finally {
         setLoading(false);
      }
   }, [url])

   return { data, error, loading }

}

export default useFetch;