case FILTER_BY_TEMP:
      const dogSelected = state.dogSelected
      const selectedTemp = payload.includes("All") ? [] : payload;
      const filteredDog = dogSelected.filter((dog) => {
        const dogTemperaments = Array.isArray(dog.temperament)
      ? dog.temperament.join(',').split(',').map(temp => temp.trim())
      : [];
        console.log(payload)
        return selectedTemp.some((temp) => dog.temperament.some(dogTemp => dogTemp.includes(temp)));
      });