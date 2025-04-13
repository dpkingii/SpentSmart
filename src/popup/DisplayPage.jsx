import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


function DisplayPage({userData}) {
    const { income,total, categories, category_amount } = userData;
    const remaining = income - total;

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#d0ed57", "#0088FE"];

    const data = categories.map((cat, i) => ({
        name: cat,
        value: category_amount[i],
    }));

    if (remaining > 0) {
        data.push({ name: "Remaining", value: remaining });
    }
    
    return (
        <div className="container2">
            <h1>Spend Summary</h1>
            <p><strong>Monthly Income:</strong> ${income}</p>
            <p><strong>Total Spent:</strong> ${total}</p>
            <p><strong>Remaining:</strong> ${remaining}</p>

            <h2>Breakdown by Category:</h2>
            <PieChart width={300} height={300}>
                <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart> 
        </div>
    );
  }
  
export default DisplayPage;