import React from 'react';
import Layout from "../components/layout";
import GraphData from '../../static/graph.json'

const SiteMap = () => {
  const elements = GraphData;

  const layout = {
    name: 'klay',
  };

  const stylesheet =[
    {
      selector: 'node',
      style: {
        'background-color': '#dd4de2'
      }
    },

    {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'line-color': '#dd4de2',
        'target-arrow-color': '#dd4de2',
        'opacity': 0.5
      }
    },

  ];

  const style = {
    height: '4000px',
    border: '#211a1d solid 0.25rem',
  };

  let CytoscapeComponent
  if (typeof window !== 'undefined') {
    CytoscapeComponent = require('react-cytoscapejs');
    const Cytoscape = require('cytoscape');
    // const COSEBilkent = require('cytoscape-cose-bilkent');
    const Klay = require('cytoscape-klay');
    Cytoscape.use(Klay)
  } else {
    CytoscapeComponent = () => (<></>)
  }

  return (
    <Layout 
      title="Site map"
    >
      <CytoscapeComponent
        elements={elements}
        layout={layout}
        stylesheet={stylesheet}
        style={style}
      />
    </Layout>
  )
}

export default SiteMap