window.addEventListener('DOMContentLoaded', () => {
    const serverList = document.getElementById('serverList');
    const newServersInput = document.getElementById('newServers');
    const updateButton = document.getElementById('updateServers');
    const messageElement = document.getElementById('message');
  
    function updateServerList() {
      window.electronAPI.getDnsServers().then(servers => {
        serverList.innerHTML = '';
        servers.forEach(server => {
          const li = document.createElement('li');
          li.textContent = server;
          serverList.appendChild(li);
        });
      });
    }
  
    updateServerList();
  
    updateButton.addEventListener('click', () => {
      const newServers = newServersInput.value.split(',').map(s => s.trim());
      window.electronAPI.setDnsServers(newServers)
        .then(result => {
          messageElement.textContent = result.message;
          if (result.success) {
            updateServerList();
            newServersInput.value = '';
          }
        })
        .catch(error => {
          messageElement.textContent = `Error: ${error.message}`;
        });
    });
  });