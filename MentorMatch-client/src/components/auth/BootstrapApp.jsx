import { useBootstrapAuth } from "../../hooks/useBootstrapAuth";

const BootstrapApp = ({ children }) => {
  const { isLoading } = useBootstrapAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col">
        Loading...
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return children;
};

export default BootstrapApp;