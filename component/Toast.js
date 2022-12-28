const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <>
      <span onClick={handleShow}>
        <div
          className={`toast show position-fixed text-light ${bgColor}`}
          style={{ top: "5px", right: "5px", zIndex: 1061, minWidth: "280px" }}
        >
          <div className={`toast-header ${bgColor} text-light d-flex justify-content-end`}>
            <strong className="mr-auto text-light">{msg.title}</strong>
            <button
              type="button"
              style={{ border: "none", cursor: 'pointer', color: '#fff' }}
              className={`${bgColor}`}
            >
              <h5>X</h5>
            </button>
          </div>

          <div className="toast-body">{msg.msg}</div>
        </div>
      </span>
    </>
  );
};

export default Toast;
