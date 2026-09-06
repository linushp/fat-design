import React, { useState } from 'react'
import * as ReactDOMClient from 'react-dom/client'
import * as ReactDOM from 'react-dom'

import { Box } from '../src/index'
import { utils } from '../src/index'
import { DemoNavigator } from './demo-navigator'
import { getDefaultDemo, getDemoById, DemoItem } from './demo-registry'
import './index.css'

const { pReactDOM, log } = utils;

// Disable logs for cleaner console
log.setLogEnable({
  debug: false,
  error: false,
  info: false,
  log: false,
  deprecated: false,
  warning: false,
});

pReactDOM.configReactDOM18(ReactDOM, ReactDOMClient);

// Demo App with Navigation
function DemoApp() {
  // Get initial demo from URL hash or default to first demo
  const getInitialDemo = (): DemoItem => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const demo = getDemoById(hash);
      if (demo) return demo;
    }
    return getDefaultDemo();
  };

  const [activeDemo, setActiveDemo] = useState<DemoItem>(getInitialDemo());

  const handleSelectDemo = (demo: DemoItem) => {
    setActiveDemo(demo);
    // Update URL hash for shareable links
    window.location.hash = demo.id;
  };

  // Listen for hash changes (browser back/forward)
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const demo = getDemoById(hash);
        if (demo && demo.id !== activeDemo.id) {
          setActiveDemo(demo);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeDemo.id]);

  const ActiveDemoComponent = activeDemo.component;

  return (
    <Box direction="row" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar Navigation */}
      <div style={{
        width: '260px',
        flexShrink: 0,
        height: '100%',
        borderRight: '1px solid #e8e8e8',
        backgroundColor: '#fafafa'
      }}>
        <DemoNavigator
          activeDemoId={activeDemo.id}
          onSelectDemo={handleSelectDemo}
        />
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        height: '100%',
        overflow: 'auto',
        backgroundColor: '#f0f2f5',
        padding: '20px'
      }}>
        {/* Demo Header */}
        <div style={{
          marginBottom: '16px',
          padding: '16px 20px',
          backgroundColor: '#fff',
          borderRadius: '4px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: 500,
            color: '#333'
          }}>
            {activeDemo.title}
          </h1>
          {activeDemo.description && (
            <p style={{
              margin: '8px 0 0',
              fontSize: '14px',
              color: '#666'
            }}>
              {activeDemo.description}
            </p>
          )}
          <div style={{
            marginTop: '8px',
            fontSize: '12px',
            color: '#999',
            fontFamily: 'monospace'
          }}>
            Demo ID: {activeDemo.id}
          </div>
        </div>

        {/* Demo Content */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '4px',
          minHeight: 'calc(100vh - 200px)',
          padding: '20px'
        }}>
          <ActiveDemoComponent />
        </div>
      </div>
    </Box>
  );
}

const root = pReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <DemoApp />
)
