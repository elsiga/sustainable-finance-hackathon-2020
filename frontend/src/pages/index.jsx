import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import '../styles/global.scss' // import global styles for some HTML tags
import 'bootstrap/dist/css/bootstrap.min.css' // load Bootstrap CSS
//import 'bootstrap/dist/js/bootstrap.bundle.min' // enable dropdown menu (JS-related BS functionalities)
import { graphql, useStaticQuery } from 'gatsby'
import styles from './index.module.scss'
import AdSense from "../components/adsense/AdSense";

export default () => {
  // load csv data with graphql
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { name: { eq: "mock_diversity_data_decision" } }) {
        nodes {
          mockDiversityData: childrenMockDiversityDataDecisionCsv {
            Decision
            Difference
            Name
            Proportion_of_women_in_board
            Proportion_of_women_in_lower_management
            Proportion_of_women_in_medium_management
            Proportion_of_women_in_upper_management
            Score
            Sector
            id
            Symbol
          }
        }
      }
    }
  `)
  const mockData = data.allFile.nodes[0].mockDiversityData // convenience variable
  // sort mockData according to highest scores first
  mockData.sort((current, other) =>
    current.Score < other.Score ? 1 : current.Score > other.Score ? -1 : 0,
  )
  const mockTopTen = mockData.slice(0, 10)

  // sort mockData according to the proportion of women on their boards
  mockData.sort((current, other) =>
    current.Proportion_of_women_in_board < other.Proportion_of_women_in_board
      ? 1
      : current.Proportion_of_women_in_board >
        other.Proportion_of_women_in_board
      ? -1
      : 0,
  )
  const mockTopTenWomenProps = mockData.slice(0, 10)

  return (
    <>
      <Header />
      <Layout>
        <main>
          <h1>Fun Hackathon Project</h1>
          <AdSense client="ca-pub-2627036954270406" slot="9590907573" />
          <p>
            We calculated a mock score as a means to measure social diversity in
            companies, i.e. the proportion of women in different industries and
            companies. The fake data was generated with Python.
            <br />
            This mock hackathon project showcases a few capabilities of React,
            Gatsby, GraphQL and SCSS.
          </p>
          <h2>Companies with the best social diversity score</h2>
          <div className="row">
            <div className={`col-4 ${styles.rankingCol}`}>
              <div>
                <strong>Name</strong>
                <ul className={`${styles.ranking}`}>
                  {mockTopTen.map((entry) => (
                    <li>{entry.Name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={`col-4 ${styles.rankingCol}`}>
              <div>
                <strong>Sector</strong>
                <ul className={`${styles.ranking}`}>
                  {mockTopTen.map((entry) => (
                    <li>{entry.Sector}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={`col-4 ${styles.rankingCol}`}>
              <div>
                <strong>Score</strong>
                <ul className={`${styles.ranking}`}>
                  {mockTopTen.map((entry) => (
                    <li>{parseFloat(entry.Score).toFixed(2)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <br />
          <h2>Companies with highest proportions of women in their boards</h2>
          <div className="row">
            <div className={`col-2 ${styles.rankingCol}`}>
              <div>
                <strong>Name</strong>
                <ul className={`${styles.ranking}`}>
                  {mockTopTenWomenProps.map((entry) => (
                    <li>{entry.Name.substr(0, 21)}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={`col-2 ${styles.rankingCol}`}>
              <div>
                <strong>Sector</strong>
                <ul className={`${styles.ranking}`}>
                  {mockTopTenWomenProps.map((entry) => (
                    <li>{entry.Sector}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={`col-2 ${styles.rankingCol}`}>
              <div>
                <strong>General</strong>
                <ul className={`${styles.ranking}`}>
                  {mockTopTenWomenProps.map((entry) => (
                    <li>
                      {parseFloat(entry.Proportion_of_women_in_board).toFixed(
                        2,
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={`col-2 ${styles.rankingCol}`}>
              <div>
                <strong>Lower</strong>
                <ul className={`${styles.ranking}`}>
                  {mockTopTenWomenProps.map((entry) => (
                    <li>
                      {parseFloat(
                        entry.Proportion_of_women_in_lower_management,
                      ).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={`col-2 ${styles.rankingCol}`}>
              <div>
                <strong>Middle</strong>
                <ul className={`${styles.ranking}`}>
                  {mockTopTenWomenProps.map((entry) => (
                    <li>
                      {parseFloat(
                        entry.Proportion_of_women_in_medium_management,
                      ).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={`col-2 ${styles.rankingCol}`}>
              <div>
                <strong>Upper</strong>
                <ul className={`${styles.ranking}`}>
                  {mockTopTenWomenProps.map((entry) => (
                    <li>
                      {parseFloat(
                        entry.Proportion_of_women_in_upper_management,
                      ).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}
