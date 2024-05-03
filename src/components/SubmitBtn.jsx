import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ text }) => {
  const navigation = useNavigation;
  const isSubmitting = navigation.state === "submitting";

  return (
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <span>sending...</span>
        </>
      ) : (
        text || "submit"
      )}
    </button>
  );
};

export default SubmitBtn;
