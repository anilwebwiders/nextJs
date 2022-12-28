const Loading = () => {
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center position-fixed"
        style={{
          height: "100%",
          width: "100%",
          zIndex: "10",
          position: "absolute",
          overflowY: "hidden",
          overflowX: "hidden",
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="spinner-grow text-primary" role="status"></div>
        <div className="spinner-grow text-secondary" role="status"></div>
        <div className="spinner-grow text-success" role="status"></div>
        <div className="spinner-grow text-danger" role="status"></div>
        <div className="spinner-grow text-warning" role="status"></div>
        <div className="spinner-grow text-info" role="status"></div>
        <div className="spinner-grow text-light" role="status"></div>
        <div className="spinner-grow text-dark" role="status"></div>
      </div>
    </>
  );
};

export default Loading;
