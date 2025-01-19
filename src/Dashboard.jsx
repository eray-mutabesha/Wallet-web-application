import Header from "./components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);














function Dashboard() {
  const navigate = useNavigate()
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("accessToken");
  const [BudgetDatas,setBudgetDatas]=useState([])
  const getBudgetDatas =()=>{
    axios.get(`${BASE_URL}/getBudgetData`,{
      headers: {
          Authorization: `Bearer ${token}`,
      },
  })  
    .then(({ data }) => {
      setBudgetDatas(data.data || []); 
    })
    .catch((err) => {
      console.log(err);
      toast.error("Il y a une erreur");
    });
  }
useEffect(()=>{
  getBudgetDatas()

  if(!localStorage.getItem("accessToken")){
    navigate("/");
   window.location.reload()
  }
},[])












  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Expenses and Income by Category",
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.5)",
        },
        ticks: {
          color: "#333",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.5)",
        },
        ticks: {
          color: "#333",
        },
      },
    },
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/GetTransactionData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;

        if (data && Array.isArray(data)) {
          const categories = data.map((item) => item.category_name);
          const expenseData = data
            .filter((item) => item.type === "Expense")
            .map((item) => item.amount);
          const incomeData = data
            .filter((item) => item.type === "Income")
            .map((item) => item.amount);

          setChartData({
            labels: categories,
            datasets: [
              {
                label: "Expenses",
                data: expenseData,
                backgroundColor: "rgba(248, 41, 86, 0.82)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
              },
              {
                label: "Income",
                data: incomeData,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error("Données invalides reçues de l'API", data);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading graphique...</p>;
  }






  











  return (
    <div>
      <div id="main-wrapper">
        {/* header and side bar */}
        <Header />
        {/* header and side bar */}

        <div className="content-body">
          <div className="container">
            <div className="row">

                    {/* alert  budget over */}
                    {/* alert  budget over */}
                    {
                     BudgetDatas.map((data,index)=>(
                       <div key={index} style={{width:"60%"}}>
                        {

                          data.amount < 0 || data.amount == 0?
                          <div className="alert alert-danger alert-dismissible fade show">
                          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="me-2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                          <strong>Alert Alert! watch out budget planned for {data.category_name} is over</strong> 
                          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="btn-close">
                                            </button>
                        </div>:""
                        }


                       </div>
                       
                     ))
                     
                    }

                 {/* alert   budget over*/}
                  {/* alert budget over */}




              <div className="col-12">
                <div className="page-title">
                  <div className="row align-items-center justify-content-between">
                    <div className="col-xl-4">
                      <div className="page-title-content">
                        <h3>Dashboard</h3>
                        <p className="mb-2">Welcome to your wallet  Management</p>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="breadcrumbs">
                        <a href="#">Home </a>
                        <span>
                          <i className="fi fi-rr-angle-small-right" />
                        </span>
                        <a href="#">Dashboard</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>




            <h1>Transactions Graph</h1>
            <Bar data={chartData} options={options} />


          </div>
        </div>
        <div className="footer">
    <div className="container">
      <div className="row">
        <div className="col-xl-6">
          <div className="copyright">
            <p>© Copyright
              <a href="#">Eray mutabesha</a> I All Rights Reserved
            </p>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="footer-social">
            <ul>
          
              <li><a href="https://x.com/ErayMutabesha"><i className="fi fi-brands-twitter" /></a></li>
              <li><a href="https://www.linkedin.com/in/eray-mutabesha-186240256/"><i className="fi fi-brands-linkedin" /></a></li>
        
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
      </div>
    </div>
  );
}

export default Dashboard;
