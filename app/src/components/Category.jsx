import { useState } from 'react';
import { Box, Button, Grid } from '@chakra-ui/react';

const categories = ['Technology', 'Sports', 'Health', 'Business', 'Entertainment'];

const CategorySelection = ({ onCategorySelect }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSelect = (category) => {
    setSelectedCategories((prev) => 
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
    );
  };

  const handleSubmit = () => {
    onCategorySelect(selectedCategories);
  };

  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {categories.map((category) => (
          <Button 
            key={category} 
            onClick={() => handleSelect(category)}
            colorScheme={selectedCategories.includes(category) ? 'teal' : 'gray'}>
            {category}
          </Button>
        ))}
      </Grid>
      <Button mt={4} colorScheme="teal" onClick={handleSubmit}>Show News</Button>
    </Box>
  );
};

export default CategorySelection;
