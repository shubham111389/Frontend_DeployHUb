import React, { useState } from 'react';

const DeploymentForm = () => {
  const [githubUrl, setGithubUrl] = useState('');
  const [deploymentStatus, setDeploymentStatus] = useState('');
  const [deployedUrl, setDeployedUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can add code to deploy the GitHub repository and handle the response
    // For simplicity, let's assume it's successful and update the state accordingly
    setDeploymentStatus('Your website is successfully deployed!');
    setDeployedUrl('http://tdz9l.dev.100xdevs.com:3001/index.html');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Deploy your GitHub Repository</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700">GitHub Repository URL:</span>
            <input
              type="text"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Deploy
          </button>
        </form>
        {deploymentStatus && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Deployment Status</h3>
            <p>{deploymentStatus}</p>
            <p className="mt-2">
              <strong>Deployed URL:</strong>{' '}
              <a href={deployedUrl} className="text-blue-500">
                {deployedUrl}
              </a>
            </p>
            <p className="mt-2">Visit Website</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeploymentForm;
