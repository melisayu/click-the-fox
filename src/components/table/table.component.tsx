import React, { FunctionComponent, ReactElement } from 'react'
import { Score } from '../../types/score.type'

interface Props {
  data: Score[]
}

const Table: FunctionComponent<Props> = ({ data }): ReactElement => {
  return (
    <div>
      <table>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Date</th>
          <th>Score</th>
        </tr>
        {data?.map((value, index) => (
          <tr key={index}>
            <td>{value.rank}</td>
            <td>{value.name}</td>
            <td>{value.date}</td>
            <td>{value.score}</td>
          </tr>
        ))}
        {data.length === 0 && (
          <tr key={'no-date'}>
            <td>{'There is no data available yet.'}</td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default Table
