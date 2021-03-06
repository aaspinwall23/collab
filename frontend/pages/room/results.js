import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Card from "../../components/ui/card";
import { COLORS } from "../../styles/colors";

export default function ResultsPage() {
  return (
    <Container>
      <Card>
        <Head>
          <title>Results!</title>
        </Head>
        <Header>Results</Header>
        <Description>
          This page will be used to display the results of the vote
        </Description>
        <Link href="/">
          <Button>Home</Button>
        </Link>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.h1`
  color: #293241;
  text-align: center;
  margin-top: 0;
  padding-top: 15px;
  font-size: 3rem;
`;

const Description = styled.p`
  color: #293241;
  margin-left: 1rem;
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 8px;
  border-radius: 5px;
  font-weight: bold;
  letter-spacing: 2px;
  border: 3px solid #293241;
  cursor: pointer;

  &:active {
    background: ${COLORS.SHADES.GREY};
    box-shadow: inset 0px 0px 5px ${COLORS.SHADES.DARKGREY};
    outline: none;
    transform: scale(0.9);
  }
`;
