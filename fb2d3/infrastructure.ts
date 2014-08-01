/// <reference path="../js/jquery.d.ts" />

interface InfoNode {
    Name: string;
    id: number;
    TextLocation: string;
}

class GenericInfoNode implements InfoNode {
    Name: string;
    id: number;
    TextLocation: string;
}

interface MappedInfoNode extends InfoNode {
    Latitude: number;
    Longitude: number;
}

interface InfoNodeSource {
    GetInfoNodes( reply? :(nodes: InfoNode[]) => void);
    GetFirstInfoNodePage( reply? :(nodes: InfoNode[]) => void);
    GetNextInfoNodePage( reply? :(nodes: InfoNode[]) => void);
    GetFirstInfoNodePageAsync() : JQueryPromise<InfoNode[]>;
    GetNextInfoNodePageAsync() : JQueryPromise<InfoNode[]>;
}

interface InfoNodePageDisplay {
    DrawPage(nodePage: InfoNode[]);
    RefreshPage(newNodePage: InfoNode[]);
}

interface InfoNodeTransformer {
    Transform(nodes: InfoNode[]): InfoNode[];
    TransformAsync(nodes: InfoNode[]): JQueryPromise<InfoNode[]>;
}