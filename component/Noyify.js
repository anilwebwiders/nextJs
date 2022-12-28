import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../store/notify/action";
import Loading from "./Loading";
import Toast from "./Toast";

const Notify = () => {
  const notify = useSelector((state) => state.notify);

  const dispatch = useDispatch();
  return (
    <>
      {notify.loading && <Loading />}
      {notify.error && (
        <Toast
          msg={{ msg: notify.error, title: "Error" }}
          handleShow={() => dispatch(notifyError())}
          bgColor="bg-danger"
        />
      )}

      {notify.success && (
        <Toast
          msg={{ msg: notify.success, title: "Success" }}
          handleShow={() => dispatch(notifySuccess())}
          bgColor="bg-success"
        />
      )}
    </>
  );
};

export default Notify;
