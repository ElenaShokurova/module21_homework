const jsObj = {
    name: "Anton",
    age: 36,
    skills: ["Javascript", "HTML", "CSS"],
    salary: 80000
  };
  console.log("jsObj", jsObj);
  
  const object = JSON.stringify(jsObj);
  console.log("JSON", object);