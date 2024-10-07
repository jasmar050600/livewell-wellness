/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

// Add this section for production server
if (process.env.NODE_ENV === 'production') {
    const express = require('express')
    const path = require('path')
    const server = express()
    
    server.use(express.static(path.join(__dirname, '/dist')))
    
    server.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '/dist/index.html'))
    })
    
    const port = process.env.PORT || 3000
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  }
