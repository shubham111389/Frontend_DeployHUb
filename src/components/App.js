import React, { useState, useEffect } from 'react';
import { deployRepository, checkDeploymentStatus } from './api'; // Import the API functions
import 'tailwindcss/tailwind.css'; // Ensure you have Tailwind CSS imported

const DeploymentForm = () => {
  const [githubUrl, setGithubUrl] = useState('');
  const [deploymentStatus, setDeploymentStatus] = useState('');
  const [deployedUrl, setDeployedUrl] = useState('');
  const [error, setError] = useState('');
  const [deployId, setDeployId] = useState('');
  const [isDeployed, setIsDeployed] = useState(false);

  useEffect(() => {
    if (deployId && !isDeployed) {
      const intervalId = setInterval(async () => {
        try {
          const statusResponse = await checkDeploymentStatus(deployId);
          if (statusResponse.status === 'deployed') {
            setDeploymentStatus('Deployed');
            setIsDeployed(true);
            setDeployedUrl(`http://${deployId}.100xdd.com:3002/index.html`);
            clearInterval(intervalId);
          } else {
            setDeploymentStatus(statusResponse.status);
          }
        } catch (error) {
          setError(error.message);
          clearInterval(intervalId);
        }
      }, 5000); // Poll every 5 seconds

      return () => clearInterval(intervalId);
    }
  }, [deployId, isDeployed]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setDeploymentStatus('Deploying...');
    setIsDeployed(false);

    try {
      const data = await deployRepository(githubUrl);
      setDeployId(data.id); // Update deployId state with the id from the response
      setDeploymentStatus(data.message);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-300">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full ">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-4">Welcome to DeployHub</h1>
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Deploy your GitHub Repository</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700 text-lg">GitHub Repository URL:</span>
            <input
              type="text"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://github.com/user/repo"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Deploy
          </button>
          {deployId && <p className="text-sm text-gray-600 mt-4">ID: {deployId} uploading completed.</p>}
        </form>
        {(deploymentStatus || error) && (
          <div className="mt-6 p-4 bg-gray-50 border-t border-gray-200 rounded-md">
            <h3 className="text-lg font-semibold text-gray-800">Deployment Status</h3>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <p className="text-gray-700">{deploymentStatus}</p>
                {isDeployed && (
                  <p className="mt-2 text-gray-700">
                    <strong>Deployed URL:</strong>{' '}
                    <a href={deployedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      {deployedUrl}
                    </a>
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeploymentForm;
