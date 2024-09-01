import React, { useEffect, useState } from 'react'
import {Box,Grid,Text,Image,Button,Flex,Divider} from '@chakra-ui/react'

import { ChakraProvider } from '@chakra-ui/react'


const categoryList=[
  {label:'All',value:''},
  {label:'Tech',value:'tech'},
  {label:'Business',value:'business'},
  {label:'Entertainment',value:'entertainment'},
  {label:'Health',value:'health'},
  {label:'Science',value:'science'},
  {label:'Sports',value:'sports'},
  {label:'Top',value:'top'},
]

const App = () => {
   const[articles,setArticles]=useState([])
   const[selectedCategory,setSelectedCategory]=useState('')

   const fetchNews=async (category ='')=>{
     const apiKey='';
     try{
      let url=`https://api.currentsapi.services/v1/latest-news?country=us&apiKey=${apiKey}`;
      if(category){
        url +=`&category=${category}`;
      }
      const response=await fetch(url);
      const data=await response.json();
      console.log("Fetched Data", data);

      if(data && data.news){
        setArticles(data.news)
      }else{
        console.log('No new found')
      }
     }catch(error){
      console.error("Error fetching news",error)
     }
   }
   useEffect(() =>{
    fetchNews(selectedCategory);
   },[selectedCategory])
  return (
    <ChakraProvider>
   <Box bg="grey" color="white" minH="100vh" p={5}>
    <Text fontSize="3xl" mb={4} fontWeight="bold" textAlign="center">
      Latest News From India
    </Text>
    <Flex justify="center" mb={6} wrap="wrap">
      {categoryList.map((category) =>(
        <Button
          key={category.value}
          m={1}
          p={4}
          borderRadius="md"
          color="red"
          _hover={{bg:'teal.600', shadow:'md'}}
          onClick={() => setSelectedCategory(category.value)}
        >{category.label}
        
        </Button>
      ))}
    </Flex>

    <Divider borderColor="gray.600" mb={6}/>
    <Grid templateColumns="repeat(auto-fit,minmax(300px,1fr))" gap={6}>
      {articles.length > 0 ? (
        articles.map((atrcile, index) =>(
          <Box
           key={index}
           borderWidth="1px"
           borderRadius="md"
           overflow="hidden"
           shadow="lg"
           bg="gray.900"
           _hover={{shadow:'2xl', transform:'scale(1.03)', transition: '0.3s ease'}}
           transition="0.3s ease"
          >
            <Image
             src={atrcile.image || 'http://via.plaeholder.com/300X200'}
             alt={atrcile.title || 'No Title'}
             fallbackSrc="https://via.placeholder.com/300x200"
             objectFit="cover"
             w="full"
             h="200px"
            
            ></Image>
            <Box p={4}>
              <Text fontSize="lg" fontWeight="bold" mb={2} noOfLines={2}>
                {atrcile.title || 'No Title'}
              </Text>
              <Text mb={4} noOfLines={3}>
                {atrcile.description || 'No Description'}
              </Text>
              <Button
                mt={2}
                as="a"
                href={atrcile.url || '#'}
                target="_blank"
                colorScheme="teal"
                size="sm"
              >Read More..</Button>
            </Box>

          </Box>
        ))
      ):(
        <Text textAlign="center">No Article Found</Text>
      )}
    </Grid>
   </Box>
   </ChakraProvider>
  )
}

export default App
