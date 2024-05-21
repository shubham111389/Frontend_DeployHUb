export const deployRepository = async (githubUrl) => {
  const response = await fetch('http://localhost:3005/deploy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({repoUrl: githubUrl }),
  });

  if (!response.ok) {
    throw new Error('Failed to deploy repository');
  }

  return await response.json();
};

export const checkDeploymentStatus = async (id) => {
  const response = await fetch(`http://localhost:3000/status?id=${id}`);
  if (!response.ok) {
    throw new Error('Failed to check deployment status');
  }
  return await response.json();
};
