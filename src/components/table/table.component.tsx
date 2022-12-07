import React, { FunctionComponent, ReactElement } from 'react'
import styled from 'styled-components'
import { Score } from '../../types/score.type'

interface Props {
  data: Score[]
}

const Table: FunctionComponent<Props> = ({ data }): ReactElement => {
  const renderScores = (data: Score[]): ReactElement => {
    return (
      <TableBody>
        {data.map((value, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{value.name}</td>
            <td>{value.date}</td>
            <td>{value.score}</td>
          </tr>
        ))}
      </TableBody>
    )
  }

  const renderNoData = (): ReactElement => {
    return (
      <TableBody>
        <tr key={'no-date'}>
          <td>{'There is no data available yet.'}</td>
        </tr>
      </TableBody>
    )
  }

  return (
    <TableWrapper>
      <TableElement>
        <TableHead>
          <tr>
            <th>Rank</th>
            <NameColumn>Name</NameColumn>
            <DateColumn>Date</DateColumn>
            <th>Score</th>
          </tr>
        </TableHead>
        {data.length > 0 ? renderScores(data) : renderNoData()}
      </TableElement>
    </TableWrapper>
  )
}

const TableWrapper = styled.div`
  max-height: 60vh;
  margin: auto;
  overflow-y: scroll;
  scroll-behavior: smooth;
  width: 30em;
  max-width: 90%;
  margin: 2em auto;
`
const TableElement = styled.table`
  background-color: white;
`

const TableHead = styled.thead`
  background-color: #FF9E9E;
  line-height: 2em;
  text-align: center;
  border: 1px solid gray;

  th {
    padding: .5em 1em;
  }
`

const TableBody = styled.tbody`
  line-height: 1.5em;

  td {
    border: .5px solid gray;
    padding: .5em 1em;
  }
`

const NameColumn = styled.th`
  width: 100%;
`

const DateColumn = styled.th`
  min-width: 5em;
`

export default Table
