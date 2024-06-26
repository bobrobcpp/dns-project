const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getDnsServers: () => ipcRenderer.invoke('get-dns-servers'),
  setDnsServers: (servers) => ipcRenderer.invoke('set-dns-servers', servers)
});