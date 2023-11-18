import { MongoClient }   from "mongodb";
class SequenceGenerator {

    // dbName:
    // collectionName:
    // sequence 
    
    /*

    static async nextSequenceNumber(client: MongoClient, dbName: string, collectionName: string, sequence: string , valueToUpdate: any): Promise<number> {
        const db =  client.db(dbName)
        const collection = db.collection(collectionName)
       
        const doc = await collection.findOne({ _id: sequence }) 
        if( doc ===  undefined ) {
            doc = { _id: sequence, sequence_value: 1 }
            await collection.insertOne(doc);
        }

        const value = doc[valueToUpdate] + 1;
        await collection.updateOne({ _id: sequence }, { $set: { sequence_value: value } });

        return value;
    }

    */

}

export const GuiIdGenerator = (theID: number) => {
    let id: number;

    const uid = ( () => (id = theID, () => theID++   )) ();
    
    return uid;
}