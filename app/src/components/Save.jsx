import { useState } from 'react';
import { Button } from '@chakra-ui/react';

const SaveArticleButton = ({ article }) => {
  const handleSave = () => {
    let savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
    savedArticles.push(article);
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
  };

  return <Button onClick={handleSave} colorScheme="blue">Save for Later</Button>;
};
export default SaveArticleButton