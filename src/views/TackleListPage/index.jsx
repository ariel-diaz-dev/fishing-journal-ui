import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetTackleQuery } from "../../services/fishing-journal-api";
import RedirectButton from "../../components/RedirectButton";
import "./index.css";

const TackleListPage = () => {
  const navigate = useNavigate();
  const { data: tackle, error, isLoading } = useGetTackleQuery();

  const redirectToTackleDetails = (tackleId) => {
    navigate(`/tackle/${tackleId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="tackle-list-page">
      <div className="page-header">
        <h1>Tackle Box</h1>
        <RedirectButton to="/new-tackle">Add New Tackle</RedirectButton>
      </div>

      <div className="tackle-container">
        {tackle && tackle.length > 0 ? (
          <ul className="tackle-list">
            {tackle.map((item) => (
              <li
                key={item.id}
                onClick={() => redirectToTackleDetails(item.id)}
                className="tackle-item cursor-pointer"
              >
                <div className="tackle-info">
                  <span className="tackle-name">{item.name}</span>
                </div>
                <div className="tackle-type">{item.type}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-tackle">
            <p>No tackle found in your box.</p>
            <RedirectButton to="/new-tackle">Add Your First Item</RedirectButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default TackleListPage;