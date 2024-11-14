import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

// Tela de Login
const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "user" && password === "Secure@123") {
      setUser(username);
      navigate("/restaurants");
    } else {
      setError("Credenciais inválidas.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div className="error">{error}</div>}
      <button onClick={handleLogin}>Entrar</button>
      <button onClick={() => navigate("/register")}>Registrar</button>
    </div>
  );
};

// Tela de Registro (Sem validação de senha)
const Register = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setError(""); // Limpar erros
    setUser(username);
    navigate("/restaurants");
  };

  return (
    <div className="register-container">
      <h2>Registrar</h2>
      <input
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <div className="error">{error}</div>}
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

// Lista de Restaurantes
const restaurants = [
  {
    id: 1,
    name: "Bistro Bella",
    img: "https://via.placeholder.com/150",
    hours: "10:00-22:00",
    description: "Um restaurante elegante com pratos franceses tradicionais.",
  },
  {
    id: 2,
    name: "Pasta Pronto",
    img: "https://via.placeholder.com/150",
    hours: "12:00-23:00",
    description: "Especializado em massas frescas e autênticas italianas.",
  },
  {
    id: 3,
    name: "Sushi World",
    img: "https://via.placeholder.com/150",
    hours: "11:00-22:00",
    description: "Oferece uma vasta variedade de sushis e pratos japoneses.",
  },
  {
    id: 4,
    name: "Steakhouse Supreme",
    img: "https://via.placeholder.com/150",
    hours: "18:00-23:00",
    description: "Steaks de qualidade superior em um ambiente moderno.",
  },
  {
    id: 5,
    name: "Vegan Delight",
    img: "https://via.placeholder.com/150",
    hours: "09:00-21:00",
    description: "Pratos veganos saborosos para todos os gostos.",
  },
  {
    id: 6,
    name: "Taco Heaven",
    img: "https://via.placeholder.com/150",
    hours: "10:00-22:00",
    description: "Tacos e pratos mexicanos frescos e autênticos.",
  },
  {
    id: 7,
    name: "Pizza Palace",
    img: "https://via.placeholder.com/150",
    hours: "12:00-24:00",
    description: "Pizzas deliciosas com ingredientes frescos.",
  },
  {
    id: 8,
    name: "Seafood Sensation",
    img: "https://via.placeholder.com/150",
    hours: "11:00-20:00",
    description: "Frutos do mar frescos e pratos inspirados no oceano.",
  },
];

// Lista de Restaurantes
const Restaurants = () => {
  const navigate = useNavigate();

  const handleDetails = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <div className="restaurants-container">
      <h2>Restaurantes Disponíveis</h2>
      <div className="restaurants-list">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <img src={restaurant.img} alt={restaurant.name} />
            <h3>{restaurant.name}</h3>
            <p>Horário: {restaurant.hours}</p>
            <button onClick={() => handleDetails(restaurant.id)}>
              Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Detalhes do Restaurante
const RestaurantDetails = () => {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === parseInt(id));
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [error, setError] = useState("");

  const handleReservation = () => {
    const [open, close] = restaurant.hours
      .split("-")
      .map((time) => parseInt(time.replace(":", "")));
    const reservationTimeParsed = parseInt(reservationTime.replace(":", ""));

    if (reservationTimeParsed < open || reservationTimeParsed >= close) {
      setError("Esse horário está fora do horário de funcionamento.");
    } else {
      setError("");
      alert(
        `Reserva agendada para ${reservationDate} às ${reservationTime} com sucesso!`
      );
    }
  };

  return (
    <div className="restaurant-details-container">
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      <p>Horário de funcionamento: {restaurant.hours}</p>
      <input
        type="date"
        value={reservationDate}
        onChange={(e) => setReservationDate(e.target.value)}
      />
      <input
        type="time"
        value={reservationTime}
        onChange={(e) => setReservationTime(e.target.value)}
      />
      {error && <div className="error">{error}</div>}
      <button onClick={handleReservation}>Agendar Reserva</button>
    </div>
  );
};

// App principal
const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="app-container">
        {!user ? (
          <Routes>
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/" element={<Login setUser={setUser} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
