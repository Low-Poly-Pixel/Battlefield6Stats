import {Container, Text, Title} from '@mantine/core';

const App = () => (
  <Container size="md" py="xl">
    <Title order={1}>Battlefield 6 Stats</Title>
    <Text mt="sm" c="dimmed">
      Track your Battlefield 6 stats — weapons, classes, and match history — in one place.
    </Text>
  </Container>
);

export default App;
