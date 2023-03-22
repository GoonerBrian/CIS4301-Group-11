#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <unordered_set>

using namespace std;

string getValuesForTable(string line);

int main(){
 ifstream file("Crops_AllData_Normalized.csv");
 int counter = 0;
 string line = "";
 ofstream out("out.txt");
 unordered_set<string> duplicate;
 
 while (!file.eof())
{
    string text = "";
    getline (file, text);
    if(text.find('"') == -1)
    {
	continue;
    }
    line = getValuesForTable(text);
    auto finder = duplicate.find(line);
    if(finder == duplicate.end())
    {
        out << line;
        duplicate.emplace(line);
    }
    //cout << text << endl;
   //out << line;
   
}
    out << "commit;";
    file.close();
    out.close();
    return 0;
}

string getValuesForTable(string line)
{
    vector<int> location;
    int index = line.find('"');
    const string first = "INSERT INTO ELEMENT VALUES ("; // change as needed
    string productID = "";
    const string last = ");\n";
    string elementCode = "";
    string ename = "";
    string unit = "";
    string value = "";
    string year = "";
    string cID = "";
    string cName = "";
    string productName = "";

    string output = "";
    while(index != -1)
    {
        location.push_back(index);
        index = line.find('"', index + 1);
    }
    cID = line.substr(location[0] + 1, location[1] - (location[0] + 1));
    cName = line.substr(location[2] + 1, location[3] - (location[2] + 1));
    productID = line.substr(location[4] + 1, location[5] - (location[4] + 1));
    productName = line.substr(location[6] + 1, location[7] - (location[6] + 1));
    elementCode = line.substr(location[8] + 1, location[9] - (location[8] + 1));
    ename = line.substr(location[10] + 1, location[11] - (location[10] + 1));
    year = line.substr(location[14] + 1, location[15] - (location[14] + 1));
    unit = line.substr(location[16] + 1, location[17] - (location[16] + 1));
    value = line.substr(location[18] + 1, location[19] - (location[18] + 1));
    try{
        stof(value);
    }
    catch(const std::invalid_argument& e)
    {
        value = "NULL";
    }
    output = first + elementCode + "," + productID + "," + "'" + ename + "'" + "," + "'" + unit + "'" + "," + value + "," + year + last;
    // make sure to only grab values needed for your table

    location.resize(0);
    return output;

}