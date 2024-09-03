import { useEffect, useState } from 'react';
import { Box, Grid, Text, Image, Button } from '@chakra-ui/react';

const NewsFeed = ({ categories }) => {
  const [articles, setArticles] = useState([]);

  // Fetch news data when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      console.log("Fetching news...");

      const apiKey = '';
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        console.log("Response received");

        const data = await response.json();
        console.log(data);

        // Check if the data is valid and contains articles
        if (data.status === 'ok' && data.articles.length > 0) {
          setArticles(data.articles);
        } else {
          console.log('No articles found or there was an issue with the API.');
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {articles.map((article, index) => (
        <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={article.urlToImage} alt={article.title} />
          <Box p={6}>
            <Text fontSize="xl">{article.title}</Text>
            <Text mt={4}>{article.description}</Text>
            <Button mt={4} as="a" href={article.url} target="_blank" colorScheme="teal">
              Read More
            </Button>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default NewsFeed;
