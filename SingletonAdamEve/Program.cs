using System;

public sealed class Adam : Male {

    private Adam() : base("Adam", null, null) {
    }

    private static Adam _adam = new Adam();
    public static Adam GetInstance ()
    {
        return _adam;
    }
}
public sealed class Eve : Female {

    private Eve() : base("Eve", null, null) {
    } 
    private static Eve _eve = new Eve();
    public static Eve GetInstance (Adam adam)
    {
        if (adam is null)
            throw new ArgumentNullException();
        return _eve;
    }
}
public class Male : Human {
    private static bool first = true;
    public Male(string name, Female mother, Male father)
    {
        if (!first && (mother is null || father is null))
            throw new ArgumentNullException();

        this.Father = father;
        this.Mother = mother;
        this.Name = name;
        first = false;
    }
}
public class Female : Human {

    private static bool first = true;
    public Female(string name, Female mother, Male father)
    {
        if (!first && (mother is null || father is null))
            throw new ArgumentNullException();
            
        this.Father = father;
        this.Mother = mother;
        this.Name = name;
        first = false;
    }
}
public abstract class Human {
    public string Name { get; set; }
    public Human Father { get; set; }
    public Human Mother { get; set; }
}
