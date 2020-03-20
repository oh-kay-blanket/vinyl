import React from 'react'

const App = ({ records }) => {

  const recordList = records.map(record => <p>{record.album} - {record.artist}</p>);

  return (
    <>
      <h1>Vinyl Collection</h1>
      {recordList}
    </>
  )
}

export default App
