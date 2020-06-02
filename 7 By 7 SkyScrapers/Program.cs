using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
public class Skyscrapers
{
    private static int Amount = 7;
    static Dictionary<int,List<int[]>> ranges = new Dictionary<int,List<int[]>>();
    static List<int[]> allCollection = new List<int[]>();

    static bool CompareArr(List<int[]> source, int[] b)
    {
        for (int arr = 0; arr < source.Count(); arr++)
        {
            bool result = true;
            for (int i = 0; i < source[arr].Length; i++)
            {
                result = result && source[arr][i] == b[i];
            }
            if (result) return true;
        }
        return false;
    }

    public static void BuildList() {
        if (allCollection.Count == 0)
            Permutation("1234567");

        return;
    }

    static void Permutation(string rest, string prefix = "")
    {
        
        if (string.IsNullOrEmpty(rest)) {
            Console.WriteLine(prefix);
            var intArr = prefix.Select(s=> int.Parse(s.ToString())).ToArray();
            int highest = 0, higherNumers = 0;
            for (int item = 0; item < intArr.Length; item++)
            {
                if (intArr[item] > highest) {
                    higherNumers++;
                    highest = intArr[item];
                }
            }
            if (!ranges.ContainsKey(higherNumers)) ranges.Add(higherNumers, new List<int[]>());
            ranges[higherNumers].Add(intArr);
            allCollection.Add(intArr);
        }

        // Each letter has a chance to be permutated
        for (int i = 0; i < rest.Length; i++)
        {                
            Permutation(rest.Remove(i, 1), prefix + rest[i]);
        }
    }

    public static int[][] SolvePuzzle(int[] clues)
    {
        BuildList();
        ArrayList collections = new ArrayList();

        for (int y = 0; y < 2; y++)
        {
            for (int x = 0; x < Amount; x++)
            {
                int clue = y == 0 ? clues[(y * Amount) + x] : clues[clues.Length - x -1];
                int clueAlt = y == 0 ? clues[(Amount*3) - x - 1] : clues[Amount + x];

                Console.WriteLine($"{clue} {clueAlt} - {x} {y}");

                List<int[]> tempCol = new List<int[]>();

                if (clue > 0)
                {
                    for (int i = 0; i < ranges[clue].Count(); i++)
                    {
                        tempCol.Add(ranges[clue][i]);
                    }
                }
                else if (clueAlt == 0)
                {
                    tempCol.AddRange(allCollection);
                }

                List<int[]> tempColFilter = new List<int[]>();

                if (clueAlt > 0)
                    for (int i = 0; i < ranges[clueAlt].Count(); i++)
                    {
                        int[] invert = ranges[clueAlt][i].Reverse().ToArray();
                        if (clue > 0)
                        {

                            if (CompareArr(tempCol, invert))
                                tempColFilter.Add(invert);
                        }
                        else
                        {
                            tempColFilter.Add(invert);
                        }
                    }
                else
                {
                    tempColFilter = tempCol;
                }

                collections.Add(tempColFilter);
            }
        }

        while (  (from List<int[]> collectionZ in collections  
                        where collectionZ.Count > 1
                        select collectionZ).Any()  ) {

            // Check for possible X
            for (int x = 0; x < Amount; x++)
            {
                List<int[]> collection = (List<int[]>)collections[x];
                List<int[]> collectionKeep = new List<int[]>();

                foreach (var item in collection)
                {
                    bool chk = false;
                    for (int y = 0; y < Amount; y++)
                    {
                        chk = false;
                        List<int[]> collectionY = (List<int[]>)collections[Amount + y];
                        foreach (var itemY in collectionY)
                        {
                            if (itemY[x] == item[y])
                            {
                                chk = true;
                                break;
                            }
                        }
                        if (!chk)
                            break;
                    }
                    if (chk) collectionKeep.Add(item);

                }
                collections[x] = collectionKeep;

            }

            // Check for possible Y
            for (int x = 0; x < Amount; x++)
            {
                List<int[]> collection = (List<int[]>)collections[Amount + x];
                List<int[]> collectionKeep = new List<int[]>();

                foreach (var item in collection)
                {
                    bool chk = false;
                    for (int y = 0; y < Amount; y++)
                    {
                        chk = false;
                        List<int[]> collectionY = (List<int[]>)collections[y];
                        foreach (var itemY in collectionY)
                        {
                            if (itemY[x] == item[y])
                            {

                                chk = true;
                                break;
                            }
                        }
                        if (!chk)
                            break;
                    }
                    if (chk) collectionKeep.Add(item);

                }
                collections[x + Amount] = collectionKeep;

            }
        }

        // Populate the Final structure
        var result = new[]{ new []{0, 0, 0, 0, 0, 0, 0},
                                new []{0, 0, 0, 0, 0, 0, 0},
                                new []{0, 0, 0, 0, 0, 0, 0},
                                new []{0, 0, 0, 0, 0, 0, 0},
                                new []{0, 0, 0, 0, 0, 0, 0},
                                new []{0, 0, 0, 0, 0, 0, 0},
                                new []{0, 0, 0, 0, 0, 0, 0}};

        // Apply ones to result
        for (int i = 0; i < collections.Count; i++)
        {
            List<int[]> item = (List<int[]>)collections[i];
            if (item.Count == 1)
            {
                if (i < Amount)
                {
                    for (int y = 0; y < Amount; y++)
                    {
                        result[y][i] = item[0][y];
                    }
                }
                else
                {
                    result[i - Amount] = item[0].ToArray();
                }
            }
        }

        return result;
    }
}