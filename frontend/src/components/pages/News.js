import React, { useState, useEffect } from "react";
import "./News.css";

const News = () => {
  const newsData = [
    { id: 1, image: "img/noel.jpg" },
    { id: 2, image: "img/noel.jpg" },
    { id: 3, image: "img/noel.jpg" },
    { id: 4, image: "img/noel.jpg" },
    { id: 5, image: "img/noel.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === newsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [newsData.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="news-page">
      <div className="news-header">
        <div className="ticker">
          <span>Tin tức</span>
        </div>
        <div className="live-clock">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>

      <div className="news-carousel">
        <div
          className="news-slider"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {newsData.map((news) => (
            <div className="news-slide" key={news.id}>
              <img src={news.image} alt={news.title} className="news-image" />
              <div className="news-content">
                <h2>{news.title}</h2>
                <p>{news.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dấu chấm chuyển trang */}
      <div className="dots-news">
        {newsData.map((_, index) => (
          <span
            key={index}
            className={`dot-news ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default News;
