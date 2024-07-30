const { default: axios, all } = require("axios");
const { useState, useEffect } = require("react");

const useFetchData = (apiEndPoint) => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchAllData = async () => {
    try {
      const res = await axios.get(apiEndPoint, {
        timeout: 100000, // set a timeout of 10 seconds
      });
      const alldata = res.data;
      setAllData(alldata);
      setLoading(false); //set loading state to false after data is fetched
    } catch (error) {
      setError(error);
      console.error("Error fetching blog data", error);
    } finally {
      setLoading(false); // set loading false even if there's an error
    }
  };
  useEffect(() => {
    if (initialLoad) {
      // set initialLoad to false to prevent the api call on subsequent renders
      setInitialLoad(false);
      setLoading(false); //set loading to false to show components initally
      return; // exit useEffect
    }
    setLoading(true);


    //fetch blog data only if apiEndPoint is exits
    if (apiEndPoint) {
      fetchAllData(); //depend on initialLoad and apiEndPoint to trigger api call
    }
  }, [initialLoad, apiEndPoint]);

  return { allData, loading, error };
};

export default useFetchData;
