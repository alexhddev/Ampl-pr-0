import { Flex, TextAreaField, Loader, Text, View, Button } from "@aws-amplify/ui-react"
import { useAIGeneration } from "../Client";
import { useState } from 'react';

// code from https://docs.amplify.aws/react/ai/set-up-ai/
function GenerateReact() {

    const [description, setDescription] = useState("");
    const [{ data, isLoading }, generateRecipe] =
      useAIGeneration("generateRecipe");
  
    const handleClick = async () => {
      generateRecipe({ description });
    };
  
    return (
      <Flex direction="column">
        <Flex direction="row">
          <TextAreaField
            autoResize
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
          />
          <Button onClick={handleClick}>Generate recipe</Button>
        </Flex>
        {isLoading ? (
          <Loader variation="linear" />
        ) : (
          <>
            <Text fontWeight="bold">{data?.name}</Text>
            <View as="ul">
              {data?.ingredients?.map((ingredient) => (
                <View as="li" key={ingredient}>
                  {ingredient}
                </View>
              ))}
            </View>
            <Text>{data?.instructions}</Text>
          </>
        )}
      </Flex>
    );
}

export default GenerateReact

